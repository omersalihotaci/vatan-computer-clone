package com.otaci.inatback.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Slider extends BaseEntity{

    private String desktopUrl;

    private String mobileUrl;

    private Long productId;

    private Integer orderIndex;

    private String title;

    private boolean active = true;
}
