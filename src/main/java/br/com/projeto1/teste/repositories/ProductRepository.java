package br.com.projeto1.teste.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto1.teste.model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, UUID>{

	
	
}
