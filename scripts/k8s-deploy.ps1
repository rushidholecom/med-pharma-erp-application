param(
    [string]$ManifestPath = ".\k8s\pharma-erp-stack.yaml",
    [string]$Namespace = "pharma-erp"
)

kubectl apply -f $ManifestPath
kubectl -n $Namespace get pods
kubectl -n $Namespace get svc
