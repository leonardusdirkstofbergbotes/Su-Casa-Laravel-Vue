<?php

namespace App\Http\Controllers;

class EmailController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function sendTestEmail ()
    {

    }
}
