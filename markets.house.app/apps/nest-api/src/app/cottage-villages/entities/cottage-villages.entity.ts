import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cottage_villages')
export class CottageVillagesEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('text')
  shortDescription!: string;

  @Column()
  permalink!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  regularPrice!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  salePrice!: number;

  @Column()
  mainImage!: string;

  @Column({ type: 'simple-json' })
  galleryImages!: string[];

  @Column({ type: 'simple-json', nullable: true })
  characteristics!: {
    _deal_sales_counts: string;
    _deal_quantity: string;
    rank_math_internal_links_processed: string;
    mf_pbt_product_ids: string;
    martfury_pbt_discount_all: string;
    martfury_pbt_checked_all: string;
    martfury_pbt_quantity_discount_all: string;
    _regular_price: string;
    total_sales: string;
    _tax_status: string;
    _tax_class: string;
    _manage_stock: string;
    _backorders: string;
    _sold_individually: string;
    _virtual: string;
    _downloadable: string;
    _product_image_gallery: string;
    _download_limit: string;
    _download_expiry: string;
    _thumbnail_id: string;
    _stock: string | null;
    _stock_status: string;
    _wc_average_rating: string;
    _wc_review_count: string;
    _product_version: string;
    _price: string;
    rank_math_seo_score: string;
    video_position: string;
    custom_badges_text: string;
    _is_new: string;
    chosen_product_cat: number[];
    _per_product_admin_commission: string;
    _per_product_admin_commission_type: string;
    _per_product_admin_additional_fee: string;
    fea_limit_visibilty: string;
    rank_math_primary_product_brand: string;
    rank_math_primary_product_cat: string;
    _yfym_cargo_types: string;
    _yfym_individual_vat: string;
    _yfym_condition: string;
    _yfym_quality: string;
    _elementor_page_assets: string[];
    pageview: string;
    _smeta_template: string;
  };

  @Column({ type: 'simple-json', nullable: true })
  attributes!: {
    id: number;
    name: string;
    options: string[];
  }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  dateModified!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  syncedAt!: Date;
}