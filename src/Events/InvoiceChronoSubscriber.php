<?php 

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface{

    private $em;
    private $invoiceRepo;
    private $user;

    public function __construct(EntityManagerInterface $em,Security $security ,InvoiceRepository $invoiceRepository)
    {
        $this->em = $em;
        $this->user = $security->getUser();
        $this->invoiceRepo = $invoiceRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['incrementChrono', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function incrementChrono(ViewEvent $event){
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if( $invoice instanceof Invoice && $method === "POST" ){
            //$value = $invoice->getChrono() + 1;
            $value = $this->invoiceRepo->findLastChrono($this->user);
          //  dd($value);
            $invoice->setChrono($value);

            // TDOO: 
            if($invoice->getSentAt() == null)
                $invoice->setSentAt(new \DateTime());
        } 
    }

}
