package com.spring.rankwelldemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.rankwelldemo.entity.Organization;
import com.spring.rankwelldemo.services.OrganizationService;

@RestController
@RequestMapping("/organization")
public class OrganizationController {

	@Autowired
    private OrganizationService organizationService;

    @PostMapping("/saveOrUpdateOrg")
    public Organization saveOrUpdateOrganization(
    		@RequestParam(required = false) Long id,
            @RequestParam String orgName,
            @RequestParam String orgEmail,
            @RequestParam String orgPhone,
            @RequestParam String orgAddress,
            @RequestParam(required = false) MultipartFile orgLogo,
            @RequestParam(required = false) MultipartFile orgBrandMedia,
            @RequestParam String orgAbout
    ) {
        return organizationService.saveOrUpdateOrganization(
                id, orgName, orgEmail, orgPhone, orgAddress,
                orgLogo, orgBrandMedia, orgAbout
        );
    }

    @GetMapping("getOrganizationDetails/{id}")
    public Organization getOrganizationDetails(@PathVariable Long id) {
        return organizationService.getOrganizationDetails(id);
    }
    
    @GetMapping("/details")
    public ResponseEntity<Organization> getOrganizationDetails() {
        Organization organization = organizationService.getOrganizationDetails();
        return ResponseEntity.ok(organization);
    }
}
