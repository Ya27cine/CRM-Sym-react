<?php 

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;
use App\Entity\Invoice;
use App\Entity\User;

class CurrentUserQuery implements QueryCollectionExtensionInterface, QueryItemExtensionInterface {

    private $user;
    private $auth;
    public function __construct(Security $security, AuthorizationCheckerInterface $auth)
    {
        $this->user = $security->getUser();
        $this->auth = $auth;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, 
    QueryNameGeneratorInterface $queryNameGenerator, 
    string $resourceClass, string $operationName = null)
    {
       $this->addWhere($queryBuilder, $resourceClass);
    }
   

   public function applyToItem(QueryBuilder $queryBuilder, 
   QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, 
   array $identifiers, string $operationName = null, array $context = [])
   {
      $this->addWhere($queryBuilder, $resourceClass);
   }

   private function addWhere($queryBuilder, $resourceClass){

    // get only data connected with user if:
    if(
        $this->user instanceof User  // Not an anonymous ( connected )
                && 
        ! $this->auth->isGranted("ROLE_ADMIN") // Not an admin
                &&
                // asked a Customer Or Invoice Resource?
        ($resourceClass == Customer::class || $resourceClass == Invoice::class)
        ){
            $alias = $queryBuilder->getRootAliases()[0];
            if($resourceClass == Invoice::class){
                $queryBuilder->join("$alias.customer", "c");
                $queryBuilder->andWhere("c.userUp = :user");
            }
            else if($resourceClass == Customer::class){
                $queryBuilder->andWhere("$alias.userUp = :user");
            }
            // put value of user
            $queryBuilder->setParameter("user", $this->user);
        }
   }

}