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
@Table(name="enroll")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = UUID)
    @Column(name = "enroll_id")
    private String id;

    @Column(nullable = false)
    private String courseid;

    @Column(nullable = false)
    private String enrollmentdate;

    // @Column(nullable = false)
    // private String courseImage;


    @OneToOne
    @JoinColumn(name = "courses_id")
    private Course course;

    


}
