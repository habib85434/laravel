# Laravel 8 with JWT
### Install JWT Package
```
    - composer require tymon/jwt-auth
```
### Add jwt package into a service provider
```
    'providers' => [
   ...
    'Tymon\JWTAuth\Providers\LaravelServiceProvider',
    ],
    'aliases' => [
        ...
        'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
         'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class,
    ],
```
### Publish jwt configuration
```
    - php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
### Generate JWT Key
It will generate a key into the .env file called "JWT_SECRET"
```
    - php artisan jwt:secret
```
### Create jwt middleware
```
    - php artisan make: middleware JwtMiddleware
    
    <?php
    namespace App\Http\Middleware;
    
    use Closure;
    use JWTAuth;
    use Exception;
    use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
    
    class JwtMiddleware extends BaseMiddleware
    {
    
        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();
            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                    return response()->json(['status' => 'Token is Invalid']);
                }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                    return response()->json(['status' => 'Token is Expired']);
                }else{
                    return response()->json(['status' => 'Authorization Token not found']);
                }
            }
            return $next($request);
        }
    }
```
### Register middleware into karnel
```
    ...
    protected $routeMiddleware = [
    ...
            'jwt.verify' => \App\Http\Middleware\JwtMiddleware::class,
            'jwt.auth' => 'Tymon\JWTAuth\Middleware\GetUserFromToken',
            'jwt.refresh' => 'Tymon\JWTAuth\Middleware\RefreshToken',
        ];
    ...
```
### Routes
```
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\ApiController;
    use App\Http\Controllers\ProductController;
    
    Route::post('login', [ApiController::class, 'authenticate']);
    Route::post('register', [ApiController::class, 'register']);
    
    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('logout', [ApiController::class, 'logout']);
        Route::get('get_user', [ApiController::class, 'get_user']);
        Route::get('products', [ProductController::class, 'index']);
        Route::get('products/{id}', [ProductController::class, 'show']);
        Route::post('create', [ProductController::class, 'store']);
        Route::put('update/{product}',  [ProductController::class, 'update']);
        Route::delete('delete/{product}',  [ProductController::class, 'destroy']);
        });
```
### Controllers
```
    - php artisan make:controller ApiController

    <?php
    namespace App\Http\Controllers;
    
    use JWTAuth;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Tymon\JWTAuth\Exceptions\JWTException;
    use Symfony\Component\HttpFoundation\Response;
    use Illuminate\Support\Facades\Validator;
    
    class ApiController extends Controller
    {
        public function register(Request $request)
        {
            //Validate data
            $data = $request->only('name', 'email', 'password');
            $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50'
            ]);
            
            //Send failed response if request is not valid
            if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        
            //Request is valid, create new user
            $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
            ]);
        
            //User created, return success response
            return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
            ], Response::HTTP_OK);
            }
        
        public function authenticate(Request $request)
        {
            $credentials = $request->only('email', 'password');
            
            //valid credential
            $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
            ]);
            
            //Send failed response if request is not valid
            if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        
        //Request is validated
        //Crean token
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json([
            'success' => false,
            'message' => 'Login credentials are invalid.',
            ], 400);
            }
        } catch (JWTException $e) {
            return $credentials;
            return response()->json([
            'success' => false,
            'message' => 'Could not create token.',
            ], 500);
        }
        
            //Token created, return with success response and jwt token
            return response()->json([
            'success' => true,
            'token' => $token,
            ]);
        }
        
        public function logout(Request $request)
        {
            //valid credential
            $validator = Validator::make($request->only('token'), [
            'token' => 'required'
            ]);
            
            //Send failed response if request is not valid
            if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        
        //Request is validated, do logout
        try {
            JWTAuth::invalidate($request->token);
            
            return response()->json([
            'success' => true,
            'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
            'success' => false,
            'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
            }
        
        public function get_user(Request $request)
        {
            $this->validate($request, [
            'token' => 'required'
            ]);
            
            $user = JWTAuth::authenticate($request->token);
            
            return response()->json(['user' => $user]);
        }
    }



    - php artisan make:model Product -rcm

    <?php
    namespace App\Http\Controllers;
    
    use App\Models\Product;
    use Illuminate\Http\Request;
    use JWTAuth;
    use Tymon\JWTAuth\Exceptions\JWTException;
    use Symfony\Component\HttpFoundation\Response;
    use Illuminate\Support\Facades\Validator;
    
    class ProductController extends Controller
    {
        protected $user;
     
        public function __construct()
        {
            $this->user = JWTAuth::parseToken()->authenticate();
    }
    
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return $this->user
        ->products()
        ->get();
    }
    
    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create()
    {
    //
    }
    
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        //Validate data
        $data = $request->only('name', 'sku', 'price', 'quantity');
        $validator = Validator::make($data, [
        'name' => 'required|string',
        'sku' => 'required',
        'price' => 'required',
        'quantity' => 'required'
        ]);
    
        //Send failed response if request is not valid
        if ($validator->fails()) {
        return response()->json(['error' => $validator->messages()], 200);
    }
    
        //Request is valid, create new product
        $product = $this->user->products()->create([
        'name' => $request->name,
        'sku' => $request->sku,
        'price' => $request->price,
        'quantity' => $request->quantity
        ]);
        
        //Product created, return success response
        return response()->json([
        'success' => true,
        'message' => 'Product created successfully',
        'data' => $product
        ], Response::HTTP_OK);
    }
    
    /**
    * Display the specified resource.
    *
    * @param  \App\Models\Product  $product
    * @return \Illuminate\Http\Response
    */
    public function show($id)
    {
        $product = $this->user->products()->find($id);
    
        if (!$product) {
        return response()->json([
        'success' => false,
        'message' => 'Sorry, product not found.'
        ], 400);
        }
        
        return $product;
    }
    
    /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Models\Product  $product
    * @return \Illuminate\Http\Response
    */
    public function edit(Product $product)
    {
    //
    }
    
    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Models\Product  $product
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Product $product)
    {
        //Validate data
        $data = $request->only('name', 'sku', 'price', 'quantity');
        $validator = Validator::make($data, [
        'name' => 'required|string',
        'sku' => 'required',
        'price' => 'required',
        'quantity' => 'required'
        ]);
        
        //Send failed response if request is not valid
        if ($validator->fails()) {
        return response()->json(['error' => $validator->messages()], 200);
        }
        
        //Request is valid, update product
        $product = $product->update([
        'name' => $request->name,
        'sku' => $request->sku,
        'price' => $request->price,
        'quantity' => $request->quantity
        ]);
        
        //Product updated, return success response
        return response()->json([
        'success' => true,
        'message' => 'Product updated successfully',
        'data' => $product
        ], Response::HTTP_OK);
    }
    
    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Models\Product  $product
    * @return \Illuminate\Http\Response
    */
    public function destroy(Product $product)
    {
        $product->delete();
        
        return response()->json([
        'success' => true,
        'message' => 'Product deleted successfully'
        ], Response::HTTP_OK);
    }
    }
```

### Models
```
// User model
<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}




//Product model
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'sku', 'price', 'quantity'
    ];
}
```
### Migrations
```
//Product migration
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('sku');
            $table->integer('price');
            $table->integer('quantity');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
```
### Migrate database
```
    - php artisan migrate
```
### Run development server
```
    - php artisan serve
```
### Now open the postman collection in the root directory and test
