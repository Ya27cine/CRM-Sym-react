<?php 

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class JwtCreatedSubscriber{

    // enrish the JWT object when it is created
    public function onCreated(JWTCreatedEvent $event){
        /** 
        * @var User
        * get Current User
        */
        $user = $event->getUser();
        $payload = $event->getData();
        $payload['firstname'] = $user->getFirstname();
        $payload['lastname']  = $user->getLastname();
        // set payload
        $event->setData( $payload );
    }

}

?>