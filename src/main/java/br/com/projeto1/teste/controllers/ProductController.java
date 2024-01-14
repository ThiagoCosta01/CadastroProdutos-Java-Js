package br.com.projeto1.teste.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.projeto1.teste.dto.ProductDto;
import br.com.projeto1.teste.model.ProductModel;
import br.com.projeto1.teste.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductRepository productRepository;
	
	@GetMapping
	public ResponseEntity<List<ProductModel>> exibirTudo() {
		
		return ResponseEntity.status(HttpStatus.OK).body(productRepository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> exibirId(@PathVariable(value="id") UUID id){
		Optional<ProductModel> productO = productRepository.findById(id);
		
		return ResponseEntity.status(HttpStatus.OK).body(productO);
	}
	
	@PostMapping
	@Transactional
	public void cadastrar(@RequestBody @Valid ProductDto productDto) {
		ProductModel a = new ProductModel(productDto);
		productRepository.save(a);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable(value="id") UUID id){
		Optional<ProductModel> productO = productRepository.findById(id);
		
		productRepository.delete(productO.get());
		
		return ResponseEntity.status(HttpStatus.OK).body(productO);
		
	}
	
}
