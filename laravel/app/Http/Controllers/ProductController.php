<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show', 'store', 'update', 'destroy']]);
    }

    public function index(Request $request)
    {
        $user_id = $request->query('user_id');

        if ($user_id) {
            $products = Product::where('user_id', $user_id)->get();
        } else {
            $products = Product::all();
        }

        return response()->json($products);
    }

    public
    function show($id)
    {
        $product = Product::with('categories')->find($id);
        return response()->json($product);
    }

    public
    function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public
    function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product, 200);
    }

    public
    function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
