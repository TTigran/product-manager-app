<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id'; // Specify the primary key field if it's different from 'id'

    protected $fillable = [
        'name',
    ];
}
