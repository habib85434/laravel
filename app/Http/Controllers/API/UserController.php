<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @author Habibur Rahman (Sr. Software Engineer) <hrekns@yahoo.com>
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(10);
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
}
