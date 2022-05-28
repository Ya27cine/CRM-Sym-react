<?php 
namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;


class EmailExistSubscriber implements EventSubscriberInterface {
    /**
     * @var UserRepository
     */
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {    
        $this->userRepository = $userRepository;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['checkEmailExist',  EventPriorities::POST_VALIDATE]
        ];
    }

    public function checkEmailExist(ViewEvent $event){

       $obj = $event->getControllerResult();
       $method = $event->getRequest()->getMethod();

       if( $obj instanceof User && $method === "POST" ){           
            $check = $this->userRepository->findBy(['email' => $obj->getEmail()]);   
            if( $check ) // email exist ??
            {
                return $event->setResponse( new Response(
                    json_encode([
                        "hydra:title" => "An error occurred",
                        "hydra:description" => "Email already exist",
                        "violations" => [ 
                            ["propertyPath" => "email",
                              "message" => "A user with this email already exist."]
                        ]
                    ]) 
                    , 404));
            } 
       }
    }
}