package com.spring.rankwelldemo.serviceImpl;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.rankwelldemo.entity.Organization;
import com.spring.rankwelldemo.repository.OrganizationRepository;
import com.spring.rankwelldemo.services.OrganizationService;

@Service
public class OrganizationServiceImpl implements OrganizationService{

	@Autowired
    private OrganizationRepository organizationRepository;
    
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/rankwellDemoData/";

    @Override
    public Organization saveOrUpdateOrganization(
    		Long id,
            String orgName,
            String orgEmail,
            String orgPhone,
            String orgAddress,
            MultipartFile orgLogo,
            MultipartFile orgBrandMedia,
            String orgAbout) {

    	 try {

    	        File dir = new File(UPLOAD_DIR);
    	        if (!dir.exists()) dir.mkdirs();

    	        Organization org;

    	        // 🔥 UPDATE
    	        if (id != null) {
    	            org = organizationRepository.findById(id)
    	                    .orElseThrow(() -> new RuntimeException("Organization not found"));
    	        } 
    	        // 🔥 CREATE
    	        else {
    	            org = new Organization();
    	        }

    	        // Common fields
    	        org.setOrgName(orgName);
    	        org.setOrgEmail(orgEmail);
    	        org.setOrgPhone(orgPhone);
    	        org.setOrgAddress(orgAddress);
    	        org.setOrgAbout(orgAbout);

    	        // 🔥 Logo Upload (only if new file comes)
    	        if (orgLogo != null && !orgLogo.isEmpty()) {

    	            String fileName = System.currentTimeMillis() + "_" + orgLogo.getOriginalFilename();
    	            File dest = new File(UPLOAD_DIR + fileName);
    	            orgLogo.transferTo(dest);

    	            org.setOrgLogo("uploads/rankwellDemoData/" + fileName);
    	        }

    	        // 🔥 Media Upload
    	        if (orgBrandMedia != null && !orgBrandMedia.isEmpty()) {

    	            String fileName = System.currentTimeMillis() + "_" + orgBrandMedia.getOriginalFilename();
    	            File dest = new File(UPLOAD_DIR + fileName);
    	            orgBrandMedia.transferTo(dest);

    	            org.setOrgBrandMedia("uploads/rankwellDemoData/" + fileName);
    	        }

    	        return organizationRepository.save(org);

    	    } catch (IOException e) {
    	        throw new RuntimeException("File upload failed");
    	    }
    }

    @Override
    public Organization getOrganizationDetails(Long id) {
        if (id == null) {
            throw new RuntimeException("Organization id is required");
        }
        return organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
    }
}
