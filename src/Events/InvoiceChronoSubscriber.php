<?php 

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class InvoiceChronoSubscriber implements EventSubscriberInterface{


    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['incrementChrono', EventPriorities::PRE_WRITE]
        ];
    }

    public function incrementChrono(ViewEvent $event){

        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if( $invoice instanceof Invoice && $method === "POST" ){
            $value = $invoice->getChrono() + 1;
            dd($value);
        } 
    }
}