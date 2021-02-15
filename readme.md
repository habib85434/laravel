<p align="center">Image upload or resizing </p>

# [Intervention Image with Laravel](http://image.intervention.io/getting_started/installation).

### Installation
$ php composer.phar require intervention/image

### Usage
```sh
// create instance
$img = Image::make('public/foo.jpg');

// resize image to fixed size
$img->resize(300, 200);

// resize only the width of the image
$img->resize(300, null);

// resize only the height of the image
$img->resize(null, 200);

// resize the image to a width of 300 and constrain aspect ratio (auto height)
$img->resize(300, null, function ($constraint) {
    $constraint->aspectRatio();
});

// resize the image to a height of 200 and constrain aspect ratio (auto width)
$img->resize(null, 200, function ($constraint) {
    $constraint->aspectRatio();
});

// prevent possible upsizing
$img->resize(null, 400, function ($constraint) {
    $constraint->aspectRatio();
    $constraint->upsize();
});

// resize the image so that the largest side fits within the limit; the smaller
// side will be scaled to maintain the original aspect ratio
$img->resize(400, 400, function ($constraint) {
    $constraint->aspectRatio();
    $constraint->upsize();
});
```
