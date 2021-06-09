<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media_records', function (Blueprint $table) {
            $table->id();
            $table->date('reporting_month');
            $table->date('sales_month');
            $table->string('platform')->nullable();
            $table->string('country')->nullable();
            $table->string('label_name')->nullable()->comment('Music companies like soundtek');
            $table->string('artiest_names')->nullable();
            $table->string('release_title')->nullable();
            $table->string('track_title')->nullable();
            $table->string('upc')->comment('Unique number');
            $table->string('isrc')->comment('Unique number');
            $table->string('release_catalog')->nullable();
            $table->string('streaming_subscription_type')->nullable();
            $table->string('release_type')->nullable();
            $table->string('sales_type')->nullable();
            $table->string('quantity')->nullable();
            $table->string('client_payment_currency')->nullable();
            $table->float('unit_price')->default(0.00);
            $table->integer('mechanical_fee')->default(0);
            $table->float('gross_revenue')->default(0.00);
            $table->float('client_share_rate')->default(0.00);
            $table->float('net_revenue')->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media_records');
    }
}

