<?php

namespace Tests\Unit;

use App\Models\AccessToken;
use Tests\TestCase;

class BaseTest extends TestCase
{

    public $key = '$a544AFD56654JHJH65465458233345asghfgsa5465ASF635dafdhhh45653llL85222dfasfd154555ASFDAFhabib$';
    public $baseUrl = 'http://127.0.0.1:8000/api/v1';

    public function keyGenerate()
    {
        AccessToken::factory(1)->create();
    }
}
