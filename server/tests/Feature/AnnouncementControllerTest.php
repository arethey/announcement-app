<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

class AnnouncementControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_user_can_create_announcement()
    {
        $data = [
            'title' => 'New Announcement',
            'content' => 'This is a test announcement.',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(7)->toDateString(),
        ];

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/announcements', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('announcements', ['title' => $data['title'], 'active' => true]);
    }

    public function test_user_can_get_all_announcements()
    {
        Announcement::factory()->count(5)->create();

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/announcements');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_user_can_get_all_active_announcements()
    {
        Announcement::factory()->create([
            'title' => 'Active Announcement',
            'start_date' => now()->subDay()->toDateString(),
            'end_date' => now()->addDay()->toDateString(),
            'active' => true,
        ]);

        $response = $this->getJson('/api/announcements/active');

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Active Announcement']);
    }

    public function test_user_can_get_single_announcement()
    {
        $announcement = Announcement::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->getJson("/api/announcements/{$announcement->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => $announcement->title]);
    }

    public function test_user_can_update_announcement()
    {
        $announcement = Announcement::factory()->create();

        $data = [
            'title' => 'Updated Announcement',
            'content' => 'Updated content.',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(10)->toDateString(),
        ];

        $response = $this->actingAs($this->user, 'sanctum')->putJson("/api/announcements/{$announcement->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('announcements', ['title' => $data['title']]);
    }

    public function test_user_can_delete_announcement()
    {
        $announcement = Announcement::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->deleteJson("/api/announcements/{$announcement->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('announcements', ['id' => $announcement->id]);
    }

    public function test_announcement_validation_on_create()
    {
        $data = [
            'title' => '',
            'content' => '',
            'start_date' => 'invalid-date',
            'end_date' => '2024-01-01',
        ];

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/announcements', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'content', 'start_date']);
    }

    public function test_announcement_automatically_marks_active()
    {
        $data = [
            'title' => 'Scheduled Announcement',
            'content' => 'Content here.',
            'start_date' => now()->subDay()->toDateString(),
            'end_date' => now()->addDay()->toDateString(),
        ];

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/announcements', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('announcements', ['title' => $data['title'], 'active' => true]);
    }

    public function test_announcements_are_sorted_by_latest_on_public_page()
    {
        Announcement::factory()->create(['start_date' => now()->subDays(2), 'end_date' => now()->addDays(2), 'active' => true]);
        Announcement::factory()->create(['start_date' => now(), 'end_date' => now()->addDays(5), 'active' => true]);

        $response = $this->getJson('/api/announcements/active');

        $response->assertStatus(200);
        $response->assertJson(fn (AssertableJson $json) =>
            $json->has(2)
                ->whereType('0.start_date', 'string')
                ->whereType('1.start_date', 'string')
                ->where('0.start_date', function ($startDate) use ($json) {
                    return $startDate > $json->toArray()[1]['start_date'];
                })
        );
    }

}
