<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact;
use App\Notifications\ContactReceived;
use App\Notifications\ContactSubmitted;
use Featherwebs\Mari\Models\PostType;
use Illuminate\Support\Facades\Notification;

class HomeController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
  }

  public function contact(Contact $request)
  {
    $name    = $request->get('name');
    $email   = $request->get('email');
    $message = $request->get('message');

    $subscribe = $request->get('subscribe');
    $subscription = PostType::where('slug', 'subscription')->first();

    if($subscribe && $subscription)
    {
      $subscription->posts()->firstOrCreate($request->subscriptionData());
    }

    Notification::route('mail', $email)->notify(new ContactSubmitted($name, $email, $message));

    if ($notifiables = fw_setting('notification-emails')) {
      Notification::send(fw_notifiables(), new ContactReceived($name, $email, $message));
    }

    return redirect()->back()->withSuccess('We have received your message. We will get back to you soon.');
  }
}
