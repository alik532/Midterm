package com.example.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.rmi.ServerException;
import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("api/v1/tasks")
@CrossOrigin
public class LabApplication {

    public LabApplication(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(LabApplication.class, args);
    }
    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getCustomers() {
        return taskRepository.findAll();
    }

    record NewTaskRequest(String text) {

    }

    record UpdateTaskRequest(Integer id, String text) {}

    @PostMapping
    public void addTask(@RequestBody NewTaskRequest request) {
        Task task = new Task();
        task.setText(request.text);
        taskRepository.save(task);
    }

    @DeleteMapping
    public void deleteTask(@Param("id") Integer id) {
        taskRepository.deleteById(id);
    }

    @PutMapping
    public void updateTask(@RequestBody UpdateTaskRequest request) {
        Task task = taskRepository.getReferenceById(request.id);
        task.setText(request.text);
        taskRepository.save(task);
    }
}
