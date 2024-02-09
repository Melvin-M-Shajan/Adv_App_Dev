package com.student.bala.model;


import static jakarta.persistence.GenerationType.*;

import java.util.List;

import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails.Address;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="courses")
public class Course {

    @Id
    @GeneratedValue(strategy = UUID)
    @Column(name = "courses_id")
    private String id;

    @Column(nullable = false)
    private String course;

    @Column(nullable = false)
    private String credit;

    @Column(nullable = false)
    private String courseImage;

    @Column(nullable = false)
    private String cost;

    @Column(nullable = false)
    private String duration;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    


}
