import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { EnrollmentsService } from './enrollment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':courseId')
  @UseGuards(AuthGuard)
  async enroll(@Req() req, @Param('courseId') courseId: number) {
    const userId = req.user.id;
    return this.enrollmentsService.enroll(userId, courseId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserEnrollments(@Req() req) {
    const userId = req.user.id;
    return this.enrollmentsService.getUserEnrollments(userId);
  }
}
