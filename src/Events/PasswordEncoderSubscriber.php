<?php 

namespace App\Events;

use App\Kernel;
use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface {

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {    
        $this->encoder = $encoder;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword',  EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event){
  
        $obj = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

       if( $obj instanceof User && $method === "POST" ){
           $hash = $this->encoder->encodePassword( $obj, $obj->getPassword() );
           $obj->setPassword( $hash );
       }
       return $obj;
    }
}