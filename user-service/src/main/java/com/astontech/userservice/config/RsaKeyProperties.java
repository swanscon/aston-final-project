package com.astontech.userservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rsa")
public record RsaKeyProperties() {
}
