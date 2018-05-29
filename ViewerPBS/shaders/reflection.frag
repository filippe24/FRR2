#version 330

//smooth in vec3 eye_normal;
//smooth in vec3 eye_vertex;

smooth in vec3 world_normal;
smooth in vec3 world_vertex;
smooth in vec3 world_camera_pos;

uniform samplerCube specular_map;
uniform samplerCube diffuse_map;
uniform vec3 fresnel;

uniform mat4 view;


out vec4 frag_color;


void main()
{
    //vec3 I = normalize(eye_vertex);
    //vec3 R = reflect(I,normalize(eye_normal));
    //R = vec3(inverse(view)*vec4(R,0.0));
    
    vec3 n = normalize(world_normal);
    vec3 v = normalize(world_camera_pos - world_vertex);
    vec3 l = reflect(-v,n);
    
    //frag_color = texture(specular_map,l);
    //gamma correction
    vec3 final_color = texture(specular_map, l).rgb;
    frag_color = vec4(pow(final_color, vec3(1.0/2.2)),1);


}
