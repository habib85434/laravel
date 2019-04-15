<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new controller instance
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    /**
     * Display a listing of the resource.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$this->authorize('isAdmin');

        if (\Gate::allows('isAdmin') || \Gate::allows('isAuthor')) {
            return User::latest()->paginate(5);
        }
    }

    /**
     * Store a newly created resource in storage.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name'              =>'required|string|max:191',
            'email'             =>'required|string|email|max:191|unique:users', //unique in the users table
            'password'          =>'required|string|min:6',
        ]);

        return User::create([
            'name'              => $request['name'],
            'email'             => $request['email'],
            'type'              => $request['type'],
            'bio'               => $request['bio'],
            'photo'             => $request['photo'],
            'password'          => Hash::make($request['password'])
        ]);
    }

    /**
     * Display the specified resource.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        //validate
        $this->validate($request,[
            'name'              =>'required|string|max:191',
            'email'             =>'required|string|email|max:191|unique:users,email,'.$user->id, //unique in the users table
            'password'          =>'sometimes|min:6', //sometimes means either user can give the pass or it can be empty
        ]);

        //update
        $user->update($request->all());


        return ['message'=>'Updated the user'];
    }

    /**
     * Remove the specified resource from storage.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        //delete the user
        $user->delete();

        return ['message'=>'User deleted'];

    }

    /**
     * Display the specified user's Profile
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        //if it is normal auth user get then
        //$theUser = Auth::User();

        //if it is an API user then
        return auth('api')->user();
    }

    /**
     * Update profile
     * @author Habibur Rahman, Sr. Software Engineer <hrekns@yahoo.com>
     *
     * @return \Illuminate\Http\Response
    */
    public function updateProfile(Request $request){
        $user                   = auth('api')->user();
        $currentPhoto           = $user->photo;

        //validate
        $this->validate($request,[
            'name'              =>'required|string|max:191',
            'email'             =>'required|string|email|max:191|unique:users,email,'.$user->id, //unique in the users table
            'password'          =>'sometimes|required|string|min:6', //sometimes means either user can give the pass or it can be empty
        ]);

        if($request->photo != $currentPhoto){
            $path               = 'imgs/profile/';
            $name               = $this->base64ToUniqueName($request->photo,$path,$currentPhoto);

            $request->merge(['photo'=> $name]);
        }

        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }

        $user->update($request->all());

        return ['message' => 'Successfully Update User Information'];
    }

    /**
     * BASE64 image file to convert a unique name with the image extension then UPLOAD TO THE GIVEN PATH and return the image name
     * @author Habibur Rahman, Sr. Software Engineer, <hrekns@yahoo.com>
     *
     * @param $base64ImageFile
     * @param $path
     * @param $currentPhoto
     * @return string;
    */
    public function base64ToUniqueName($base64ImageFile, $path,$currentPhoto){
        $name =  time().'.' . explode('/', explode(':', substr($base64ImageFile, 0, strpos($base64ImageFile, ';')))[1])[1];

        //UPLOAD Using Image intervention package
        \Image::make($base64ImageFile)->save(public_path($path).$name);

        //DELETE old image
        $userPhoto = public_path($path).$currentPhoto;
        if(file_exists($userPhoto)){
            @unlink($userPhoto);
        }

        return $name;
    }
}
