export interface Teacher {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type Timestamps = {
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export type Course = Timestamps & {
  id: number;
  title: string;
  description: string;
  teacher_id: string;
  image: string;
  price: number;
  ratings_count: number;
  subscriptions_count: number;
};

export type CourseLecture = Timestamps & {
  id: number;
  title: string;
  order: number;
  course_id: number;
};

export type CourseRating = Timestamps & {
  id: number;
  rating: number;
  course_id: number;
  user_id: number;
};

export type FullCourseRating = CourseRating & {
  course: Course;
  user: User;
};

export type LectureItem = Timestamps & {
  id: number;
  lecture_id: number;
  title: string;
  file: string;
  file_type: string;
  file_size: string;
  video_duration: string;
  order: number;
  is_active: boolean;
};

export type CourseSubscription = Omit<Timestamps, "deleted_at"> & {
  id: number;
  course_id: number;
  user_id: number;
  status: "active" | "inactive";
};

export type User = Omit<Timestamps, "deleted_at"> & {
  id: number;
  name: string;
  email: string;
  phone: string;
  faculty_id: number;
  email_verified_at?: string;
  remember_token?: string;
};

export type FullSubscription = CourseSubscription & {
  course: Course;
  user: User;
};

export type FullLecture = CourseLecture & {
  items: LectureItem[];
};

export type PaginationLink = {
  active: boolean;
  url: string;
  label: string;
};

export type PaginationData<T> = {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
};

export type DashboardPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  total_courses: number;
  total_subscriptions: number;
  total_lectures: number;
  total_file_size: number;
};

export type SubscriptionsPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  subscriptions: PaginationData<FullSubscription[]>;
};

export type CoursesPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  courses: PaginationData<Course[]>;
};

export type UpdateCoursePageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  course: Course;
};

export type ViewCoursePageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  course: Course;
  lectures: FullLecture[];
  subscriptions: PaginationData<FullSubscription[]>;
};

export type AuthenticatedLayoutPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  flash: {
    message: string;
    type: string;
  };
};

export type ViewLecturePageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  course: Course;
  lecture: FullLecture;
};

export type CreateLectureItemPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  lecture: CourseLecture;
};

export type UpdateLectureItemPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  lecture: CourseLecture;
  item: LectureItem;
};

export type CourseRatingsPageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    teacher: Teacher;
  };
  course: Course;
  ratings: FullCourseRating[];
};
