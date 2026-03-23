package com.spring.rankwelldemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.rankwelldemo.entity.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long>  {

}
