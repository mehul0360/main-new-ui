<?php

namespace App\Http\Controllers;

class ConnectionController extends Controller
{
    /**
     * Display the list of all the connections.
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function index()
    {
        return view('connections.index');
    }

    /**
     * Display the form to create a new connection
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function create()
    {
        return view('connections.create');
    }
}
