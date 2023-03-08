<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => true,
                    'type' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            try {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password)
                ]);

                $token = Auth::login($user);

                return response()->json([
                    'status' => true,
                    'message' => 'success',
                    'token' => $token,
                    'user' => $user
                ], 200);
            }
            catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'type' => 'mysql error',
                    'error' => $th->getMessage()
                ], 400);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => true,
                'type' => 'create error',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'type' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $credentials = $request->only(['email', 'password']);
            $token = Auth::attempt($credentials);

            if(!$token){
                return response()->json([
                    'status' => false,
                    'type' => 'auth error',
                    'error' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $token,
                'user' => $user
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'type' => 'auth error',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            $validateEmail = Validator::make($request->all(), ['email' => 'required|email']);

            if($validateEmail->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateEmail->errors()
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            if ($user == null) {
                return response()->json([
                    'status' => false,
                    'message' => 'email not found',
                    'errors' => 'The email you typed in is not registered on our database'
                ], 401);
            }

            // TODO: send email link

            return response()->json([
                'status' => true,
                'message' => 'password reset sent'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'token' => Auth::refresh()
        ]);
    }
}
