import React from 'react'
import Back from '../../components/common/back/Back'
import CourseCard from '../../components/user/allCourses/CoursesCard'

const CourseHome = () => {
    return(
        <>
            <Back title='Explore Courses' />
            <CourseCard />
        </>
    )
}
export default CourseHome