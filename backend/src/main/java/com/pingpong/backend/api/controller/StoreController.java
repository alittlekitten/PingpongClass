package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.ItemEntity;
import com.pingpong.backend.api.domain.response.ItemStudentResponse;
import com.pingpong.backend.api.service.ItemService;
import com.pingpong.backend.api.service.ItemServiceImpl;
import com.pingpong.backend.api.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "상점 API", tags={"상점"})
@CrossOrigin
@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class StoreController {
    private final ItemServiceImpl itemService;
    private final StudentService studentService;

    @ApiOperation(value = "전체 아이템 목록 조회", notes = "학생이 뽑을 수 있는 모든 아이템의 목록을 조회한다.")
    @GetMapping("")
    public List<ItemEntity> findAll() throws Exception {
        return itemService.loadItem();
    }

    @ApiOperation(value = "보유 아이템 목록 조회", notes = "학생이 보유하는 모든 아이템의 목록을 조회한다.")
    @GetMapping("/{studentId}")
    public List<ItemStudentResponse> findByStudent(@PathVariable final int studentId) throws Exception {
        return itemService.findItemById(studentId);
    }

    @ApiOperation(value = "아이템 사용", notes = "선택한 아이템을 사용합니다.")
    @DeleteMapping("/{studentId}/{itemId}")
    public List<ItemStudentResponse> delete(@PathVariable final int studentId, @PathVariable final int itemId) throws Exception{
        itemService.delete(studentId, itemId);
        return itemService.findItemById(studentId);
    }

    @ApiOperation(value = "칭찬스티커 개수 조회", notes = "유저의 현재 사용가능한 칭찬스티거 개수를 조회합니다.")
    @GetMapping("/sticker/{studentId}")
    public int findSticker(@PathVariable final int studentId) throws Exception {
        return studentService.findByStudentId(studentId).get().getPoint();
    }

    @ApiOperation(value = "칭찬스티커 개수 사용", notes = "유저의 사용가능한 칭찬스티커 5장을 소멸시킵니다.")
    @PatchMapping("/sticker")
    public int useSticker(@RequestBody final int params) throws Exception {
        return itemService.updatePoint(params);
    }
}