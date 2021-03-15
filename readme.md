# Laravel Eloquent


### Using query and with
Models
```
<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $fillable =[
        'id',
        'pet_type_id',
        'category_id',
        'parents_id',
        'created_by',
        'updated_by',
        'company_id',
        'booked_customer',
        'price',
        'color',
        'introduction_from_breeder',
        'name',
        'date_of_birth',
        'possible_date_of_birth',
        'image_path',
        'image',
        'show_start_at',
        'show_end_at',
        'sex',
        'is_borned',
        'sale_status',
        'status',

        ];

    public function petType ()
    {
        return $this->belongsTo(PetType::class,'pet_type_id','id');
    }

    public function category ()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function parents ()
    {
        return $this->belongsTo(PetParents::class,'parents_id','id');
    }

    public function createdBy ()
    {
        return $this->belongsTo(User::class,'created_by','id');
    }

    public function updatedBy ()
    {
        return $this->belongsTo(User::class,'updated_by','id');
    }

    public function gallery ()
    {
        return $this->hasMany(PetGallery::class,'pet_id','id');
    }

    public function reviews ()
    {
        return $this->hasMany(Review::class,'pet_id','id');
    }

    public function breeder ()
    {
        return $this->belongsTo(BreederCompany::class,'company_id','id');
    }
    public function dealSummary ()
    {
        return $this->hasMany(DealSummary::class,'pet_id','id');
    }
    public function transactionNavi ()
    {
        return $this->hasMany(TransactionNavi::class,'pet_id','id');
    }
    public function booking_customer ()
    {
        return $this->belongsTo(Customer::class,'booked_customer','id');
    }
    public function foot_prints ()
    {
        return $this->hasMany(Favorite::class,'pet_id','id');
    }
    public function sell_details ()
    {
        return $this->hasOne(Sell::class,'pet_id','id');
    }
    public function views ()
    {
        return $this->hasMany(PetView::class,'pet_id','id');
    }
    public function biological_guarantee ()
    {
        return $this->hasOne(PetBiologicalGuarantee::class,'pet_id','id');
    }
    public function visit_requests ()
    {
        return $this->hasMany(VisitRequest::class,'pet_id','id');
    }
}

```

Repository
```
public function allPets (int $record)
    {
        try {
            $this->paginationNumber = $record;

            $pets = $this->model->query();

            $pets->with([
                    'petType',
                    'category',
                    'parents'=> function ( $p ) {
                        $p->with('category');
                    },
                    'gallery',
                    'breeder',
                    'reviews'=> function($q)
                    {
                        $q->where('display_status', '=', 'ACTIVE');
                        $q->with(['replies' => function($rr)
                        {
                            $rr->where('display_status', '=', 'ACTIVE');
                        }]);
                    },
                    'dealSummary'=> function($d)
                    {
                        $d->with([
                            'customer',
                        ]);
                    },
                    'transactionNavi'=> function($tn)
                    {
                        $tn->with([
                            'customer',
                        ]);
                    },
                ])
                ->where('status', '!=', 'DELETE')
                ->orderBy('created_at', 'desc');

              $record == 0 ? $pets->get() : $pets->paginate($this->paginationNumber); 

            return $pets;

        } catch ( \Throwable $throwable ) {
            throw new \Exception($throwable->getMessage());
        }
    }
```
