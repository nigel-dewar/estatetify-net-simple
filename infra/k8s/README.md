# Commands for K8s

## DEPLOYMENTS

### deploy folder of manifests

```text

    kubectl apply -f .

```

### apply a fresh image to deployment

```text

    kubectl set image deployment/mgt-deployment mgt=my-regsitry:55000/re-mgt:<version-name>

```



## INGRESS


We are using ingress-nginx which is a 'community led project'.
https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/

Useful reading -
https://www.joyfulbikeshedding.com/blog/2018-03-26-studying-the-kubernetes-ingress-system.html

### Docker Desktop Setup
https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/15603106#overview

Make sure you executed the mandatory generic script that was discussed in the lecture

```Text

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml

```

Execute the provider specific script to enable the service:

```Text
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml

```

The official docs are not very clear about this but the script applies to both Windows and Mac versions of Docker Desktop, even though it only lists Docker for Mac. If you have missed this step, then your Ingress will not work!

Verify the service was enabled by running the following:

```Text
kubectl get svc -n ingress-nginx
```

## Kubernetes Dashboard

Run the file in dashboard folder

```text
kubectl apply -f kubernetes-dashboard.yaml
kubectl proxy
```
dashboard exposes on 127.0.0.1:8001
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/

choose skip

# Google Cloud

## 

# setup helm

## Install Helm

this vid shows how on gke
https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628272#overview

https://helm.sh/docs/intro/quickstart/

https://helm.sh/docs/intro/install/



run from cloud console

```text



```

nginx-ingress-helm doco
https://kubernetes.github.io/ingress-nginx/deploy/#using-helm

