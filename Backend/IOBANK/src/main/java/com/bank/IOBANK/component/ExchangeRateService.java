package com.bank.IOBANK.component;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@Component
@Data
@RequiredArgsConstructor
public class ExchangeRateService {

    @Autowired
    private RestTemplate restTemplate;

    private Map<String, Double> rates = new HashMap<>();

    private final Set<String>CURRENCIES = Set.of(
            "USD",
            "EUR",
            "GBP",
            "JPY",
            "NGN",
            "INR"
    );



    @Value("${currencyApi_apiKey}")
    private String apiKey ;

    public void getExchangeRate(){
        String CURRENCY_API = "https://api.currencyapi.com/v3/latest?apikey=";
        var response= restTemplate.getForEntity(CURRENCY_API + apiKey, JsonNode.class);

        var data = Objects.requireNonNull(response.getBody()).get("data");

        for (var currency : CURRENCIES){
            rates.put(currency, data.get(currency).get("value").doubleValue());
        }
        System.out.println(rates);
    }

}
