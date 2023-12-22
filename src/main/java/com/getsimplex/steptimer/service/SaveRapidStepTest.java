//Copyright 2021 Sean Murdock

package com.getsimplex.steptimer.service;

import com.getsimplex.steptimer.datarepository.CustomerRepository;
import com.getsimplex.steptimer.datarepository.RapidStepTestRepository;
import com.getsimplex.steptimer.model.Customer;
import com.getsimplex.steptimer.model.DeviceMessage;
import com.getsimplex.steptimer.model.User;
import com.getsimplex.steptimer.utils.JedisClient;
import com.google.gson.Gson;
import com.getsimplex.steptimer.model.RapidStepTest;
import com.getsimplex.steptimer.utils.GsonFactory;

import java.util.Optional;


/**
 * Created by sean on 9/7/2016.
 */
public class SaveRapidStepTest {
    private static Gson gson = GsonFactory.getGson();

    private static RapidStepTestRepository rapidStepTestRepository = new RapidStepTestRepository();

    public static void save(String rapidStepTestString) throws Exception{
        System.out.println("Rapid Step Test:"+rapidStepTestString);
        RapidStepTest rapidStepTest = gson.fromJson(rapidStepTestString, RapidStepTest.class);
        User user = FindUser.getUserByUserName(rapidStepTest.getCustomer());//we are assuming the user is testing their own risk

        rapidStepTestRepository.addToArrayAtKey(user.getPhone(),rapidStepTest);
        // The above adds the data to a redis key called RapidStepTests which is a JSON object with the key being the customer phone number:
        // - the array for each phone number contains all the rapid step tests for the customer
        //- the array is in ascending order of the creation time of the test

        DeviceMessage deviceMessage = new DeviceMessage();
        deviceMessage.setDeviceId(user.getEmail());
        deviceMessage.setMessage(rapidStepTestString);

        MessageIntake.route(deviceMessage);

    }
}
