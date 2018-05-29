#version 330

layout (location = 0) in vec3 vert;
layout (location = 1) in vec3 normal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat3 normal_matrix;

//smooth out vec3 eye_normal;
//smooth out vec3 eye_vertex;

smooth out vec3 world_normal;
smooth out vec3 world_vertex;
smooth out vec3 world_camera_pos;


void main(void)  {
    //eye_vertex = vec3(view*model*vec4(vert,1.0));
    //eye_normal= vec3(normal_matrix*normal);
  
    world_camera_pos = inverse(view)[3].xyz;
    world_vertex = vec3(model*vec4(vert,1.0));
    world_normal= vec3(normal);

    gl_Position = projection * view * model * vec4(vert, 1);
}
