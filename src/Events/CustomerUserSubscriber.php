<?php 

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class CustomerUserSubscriber implements EventSubscriberInterface{

    private $user;

    public function __construct(Security $security)
    {
        $this->user = $security->getUser();
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ["setUserForCustomer", EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(ViewEvent $event){
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if( $method === "POST" && $customer instanceof Customer)
        {
           $customer->setUserUp( $this->user );
        }
    }


}