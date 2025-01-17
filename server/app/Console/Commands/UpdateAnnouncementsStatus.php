<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Announcement;

class UpdateAnnouncementsStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'announcements:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update announcements active status based on start and end dates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now()->toDateString();

        Announcement::query()->update(['active' => false]); // Reset all
        Announcement::where('start_date', '<=', $now)
            ->where('end_date', '>=', $now)
            ->update(['active' => true]);

        $this->info('Announcements status updated successfully.');
    }
}
