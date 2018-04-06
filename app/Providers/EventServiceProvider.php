<?php

namespace App\Providers;

use App\Listeners\ImageDeleted;
use App\Listeners\ImageRenamed;
use App\Listeners\ImageUploaded;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Unisharp\Laravelfilemanager\Events\ImageIsDeleting;
use Unisharp\Laravelfilemanager\Events\ImageIsRenaming;
use Unisharp\Laravelfilemanager\Events\ImageWasDeleted;
use Unisharp\Laravelfilemanager\Events\ImageWasUploaded;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        ImageWasUploaded::class => [
            ImageUploaded::class,
        ],
        ImageIsRenaming::class => [
            ImageRenamed::class
        ],
        ImageWasDeleted::class => [
            ImageDeleted::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
