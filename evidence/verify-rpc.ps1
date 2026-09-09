# Query the local CKB devnet directly over JSON-RPC to confirm the counter
# contract is deployed and live. No test run, no build - just the node's answers.
# Run from exercises/counter-script:  ..\..\evidence\verify-rpc.ps1
#
# Note: use Invoke-RestMethod, not curl. In PowerShell 5.1 `curl` is an alias
# for Invoke-WebRequest, and curl.exe needs backtick-escaped JSON that is easy
# to get wrong.

$node = 'http://127.0.0.1:8114'
$sj   = Join-Path (Get-Location) 'deployment\scripts.json'

if (-not (Test-Path $sj)) {
    Write-Error "No deployment\scripts.json here. Run this from exercises\counter-script after deploying."
    exit 1
}

# Works for any offckb project: take whichever contract this one deployed.
$devnet   = (Get-Content $sj -Raw | ConvertFrom-Json).devnet
$contract = ($devnet | Get-Member -MemberType NoteProperty | Select-Object -First 1).Name
if (-not $contract) { Write-Error "No devnet deployment recorded in $sj"; exit 1 }
$TX = $devnet.$contract.cellDeps[0].cellDep.outPoint.txHash

function rpc($method, $params) {
    $body = @{ jsonrpc = '2.0'; method = $method; params = $params; id = 1 } |
            ConvertTo-Json -Depth 5 -Compress
    Invoke-RestMethod -Uri $node -Method Post -ContentType 'application/json' -Body $body -TimeoutSec 10
}

try { $tip = (rpc 'get_tip_block_number' @()).result }
catch {
    Write-Host "devnet unreachable at $node - start it with: offckb node" -ForegroundColor Yellow
    exit 1
}

$status = (rpc 'get_transaction' @($TX)).result.tx_status.status
$cell   = (rpc 'get_live_cell' @(@{ tx_hash = $TX; index = '0x0' }, $false)).result.status

$tipDec = [Convert]::ToInt64($tip.Substring(2), 16)

"CKB devnet JSON-RPC check - $((Get-Date).ToUniversalTime().ToString('yyyy-MM-dd HH:mm')) UTC"
"  node          $node"
"  tip block     $tipDec ($tip)"
"  contract      $contract"
"  deploy tx     $TX"
"  tx status     $status"
"  code cell     $cell"
""
if ($status -eq 'committed' -and $cell -eq 'live') {
    "  OK - $contract is deployed and live on devnet."
} else {
    "  NOT OK - expected tx 'committed' and cell 'live'."
}
