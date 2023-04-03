docker_build('expidus/website', '.', dockerfile='Dockerfile.dev', live_update=[
  sync('.', '/build'),

  run('flutter build web')
])

k8s_yaml('deploy/k8s.yaml')
k8s_resource(workload='expidus-website', port_forwards=['8080:80'])
