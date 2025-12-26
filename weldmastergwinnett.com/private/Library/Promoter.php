<?php

class Promoter {

    private DBO_advertisements $dbo;

    public function __construct(DBO_advertisements $dbo) {
        $this->dbo = $dbo;
    }

    public function renderBanner(): string {
        $ads = $this->dbo->readAdvertisements();

        $payload = [];

        foreach ($ads as $ad) {
            $payload[] = [
                'id'       => (int)$ad['id'],
                'filename' => $ad['filename'],
                'url'      => $ad['url']
            ];
        }

        $json = htmlspecialchars(
            json_encode($payload, JSON_THROW_ON_ERROR),
            ENT_QUOTES,
            'UTF-8'
        );

        return '
            <div class="Banner" data-advertisements=\'' . $json . '\'>
              <a id="BannerLink" href="mailto:sam@weldmastergwinnett.com?subject=Advertising%20Inquiry">
                <img id="BannerImage" src="Assets/Advertisements/default.jpg" alt="Advertise Here">
              </a>
            </div>';
    }
}
