#version 330

smooth in vec3 world_vertex;

uniform samplerCube specular_map;


vec3 color = vec3(0.6);

out vec4 frag_color;

void main (void) {
 vec3 V = normalize(world_vertex);
// frag_color = texture(specular_map, V);
//gamma correction
 vec3 final_color = texture(specular_map, V).rgb;
 frag_color = vec4(pow(final_color, vec3(1.0/2.2)),1);


}
