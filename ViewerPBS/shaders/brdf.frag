#version 330

smooth in vec3 world_normal;
smooth in vec3 world_vertex;
smooth in vec3 world_camera_pos;

uniform samplerCube specular_map;
uniform samplerCube diffuse_map;
uniform vec3 fresnel;

uniform mat4 view;

out vec4 frag_color;


float G1(vec3 n, vec3 v, vec3 l, vec3 h)
{
    //geometry 2
     float Ga = (2*dot(n,h)*dot(n,v))/dot(v,h);
     float Gb = (2*dot(n,h)*dot(n,l))/dot(v,h);
     float G = min(Ga,Gb);
     if(G > 1)
         G = 1;
     return G;
}

void main (void) {


   vec3 n = normalize(world_normal);
   vec3 v = normalize(world_camera_pos - world_vertex);
   vec3 l = reflect(-v,n);

   float G1 = G2(n,v,l,n);

   float i = (fresnel.x + fresnel.y + fresnel.z)/3.0;
   vec3 F = fresnel + (1 - fresnel)*pow((1 - dot(l,n)),5.0) + (1 - i)*0.4;
// vec3 F = fresnel + (1 - fresnel)*pow((1 - dot(l_c,h_c)),5.0);


   vec3 D =  texture(diffuse_map,l).rgb;
   D = pow(D, vec3(1.0/2.2));



//    vec3 f = F*G2*D/(dot(n,l)*dot(n,v));
    vec3 f = (1 - i)*D + F*D/(4*dot(n,l)*dot(n,l));
    frag_color = vec4(f, 1);

}


