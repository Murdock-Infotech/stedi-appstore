package com.getsimplex.steptimer.service;

import com.getsimplex.steptimer.model.Customer;
import com.getsimplex.steptimer.utils.JedisClient;
import com.getsimplex.steptimer.utils.JedisData;
import com.getsimplex.steptimer.utils.SendText;
import com.google.gson.Gson;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;
import spark.Request;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

/**
 * Created by Mandy on 10/4/2016.
 */
public class CreateNewCustomer {

    private static Gson gson = new Gson();
    private static JedisClient jedisClient = new JedisClient();

    public static String handleRequest(Request request) throws Exception{
        String newCustomerRequest = request.body();
        Customer newCustomer = gson.fromJson(newCustomerRequest, Customer.class);

        return createCustomer(newCustomer);

    }

    public static String createCustomer(Customer newCustomer) throws Exception{
//        List<Customer> customers = JedisData.getEntityList(Customer.class);
//        Predicate<Customer> findExistingCustomerPredicate = customer -> customer.getEmail().equals(newCustomer.getEmail());
        String phone = newCustomer.getPhone();
        String formattedPhone = SendText.getFormattedPhone(phone);
        newCustomer.setPhone(formattedPhone);
        Optional<Customer> matchingCustomer = JedisData.getEntityById(Customer.class, newCustomer.getPhone());

        if (matchingCustomer.isPresent()){
            throw new Exception("Customer already exists");
        }

        if (newCustomer != null && !newCustomer.getCustomerName().isEmpty() && !newCustomer.getEmail().isEmpty()) {
            //SAVE USER TO REDIS
            JedisData.loadToJedis(newCustomer, newCustomer.getPhone(), 0l);
        } else{
            throw new Exception("Customer must have a non-empty name and email address");
        }
        return "Welcome: " + newCustomer.getCustomerName();
    }

}
