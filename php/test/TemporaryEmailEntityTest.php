<?php
declare(strict_types=1);

// TemporaryEmail entity test

require_once __DIR__ . '/../tempmailapi2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TemporaryEmailEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TempMailApi2SDK::test(null, null);
        $ent = $testsdk->TemporaryEmail(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = temporary_email_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "temporary_email." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $temporary_email_ref01_ent = $client->TemporaryEmail(null);
        $temporary_email_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.temporary_email"), "temporary_email_ref01"));
        $temporary_email_ref01_data["email"] = $setup["idmap"]["email01"];

        $temporary_email_ref01_data_result = $temporary_email_ref01_ent->create($temporary_email_ref01_data, null);
        $temporary_email_ref01_data = Helpers::to_map($temporary_email_ref01_data_result);
        $this->assertNotNull($temporary_email_ref01_data);

        // LOAD
        $temporary_email_ref01_match_dt0 = [];
        $temporary_email_ref01_data_dt0_loaded = $temporary_email_ref01_ent->load($temporary_email_ref01_match_dt0, null);
        $this->assertNotNull($temporary_email_ref01_data_dt0_loaded);

        // REMOVE
        $temporary_email_ref01_match_rm0 = [
            "id" => $temporary_email_ref01_data["id"],
        ];
        $temporary_email_ref01_ent->remove($temporary_email_ref01_match_rm0, null);

    }
}

function temporary_email_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/temporary_email/TemporaryEmailTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TempMailApi2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["temporary_email01", "temporary_email02", "temporary_email03", "temp_mail01", "temp_mail02", "temp_mail03", "message01", "message02", "message03", "email01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID" => $idmap,
        "TEMPMAILAPI__TEST_LIVE" => "FALSE",
        "TEMPMAILAPI__TEST_EXPLAIN" => "FALSE",
        "TEMPMAILAPI__APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TEMPMAILAPI__TEST_TEMPORARY_EMAIL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TEMPMAILAPI__TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["TEMPMAILAPI__APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new TempMailApi2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["TEMPMAILAPI__TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TEMPMAILAPI__TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
