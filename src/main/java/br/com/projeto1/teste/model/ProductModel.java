package br.com.projeto1.teste.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

import br.com.projeto1.teste.dto.ProductDto;
import jakarta.persistence.*;

@Entity
@Table(name = "TB_PRODUCTS")
public class ProductModel implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;
	
	private String name;
	
	private String description;
	
	private BigDecimal value;

	public ProductModel() {
		
	}
	
	public ProductModel(UUID id, String name, BigDecimal value, String description) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.value = value;
	}

	public ProductModel(ProductDto productDto) {
		this.id = null;
		this.name = productDto.name().toUpperCase();
		this.description = productDto.description();
		this.value = productDto.value();
	}
	
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return description;
	}

	public void setDesc(String desc) {
		this.description = desc;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	@Override
	public int hashCode() {
		return Objects.hash(name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductModel other = (ProductModel) obj;
		return Objects.equals(name, other.name);
	}
	
	
	
}
