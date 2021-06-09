<?php


namespace App\Libs\StringOperations;


class MediaStringDataProcess
{
    private $string;

    public function __construct($string)
    {
        $this->string = $string;
    }

    public function stringToArray()
    {
        $arr = [];
        $str = str_replace('"','', $this->string);
        $arr = explode(";",$str);

        return $arr;
    }

}

