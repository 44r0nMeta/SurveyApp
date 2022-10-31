<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\LoginUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Cookie;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->all();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => [
                'name' => $user->email,
                'email' => $user->name
            ],
            'token' => $token
        ]);

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\LoginStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginUserRequest $request)
    {
        $credentials = $request->all();
        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']);

        if (!auth()->attempt($credentials, $remember)) {

            return response([
                'message' => 'email or password incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */

        $user = auth()->user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response([
            'user' => [
                'name' => $user->email,
                'email' => $user->name
            ],
            'token' => $token
        ]);

    }

    public function logout(Request $request)
    {

        /** @var \App\Models\User $user */

        $user = Auth::user();
        //Revoke on using token
        $user->tokens()->delete();


        Auth::guard('web')->logout();

        return response([
            'success' => true,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => [
                'name' => $user->email,
                'email' => $user->name
            ],
           'token' => $token
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
