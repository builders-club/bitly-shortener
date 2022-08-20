export interface References {
  [key: string]: string
}

/**
 * A Bitly link deep link
 */
export interface DeepLink {
  /**
   * Bitlink
   */
  bitlink: string
  /**
   * Install URL
   */
  install_url: string
  /**
   * Created date
   */
  created: string
  /**
   * App URI path
   */
  app_uri_path: string
  /**
   * Modified
   */
  modified: string
  /**
   * Install type
   */
  install_type: string
  /**
   * App GUID
   */
  app_guid: string
  /**
   * GUID
   */
  guid: string
  /**
   * OS
   */
  os: string
}

/**
 * Type for a bitly response
 */
export interface BitlyLink {
  /**
   * References
   */
  references: References
  /**
   * Archived
   */
  archived: boolean
  /**
   * Tags
   */
  tags: string[]
  /**
   * Created Time
   */
  created_at: string
  /**
   * Title
   */
  title?: string
  /**
   * Deep links
   */
  deeplinks: DeepLink[]
  /**
   * Created By
   */
  created_by?: string
  /**
   * Long URL
   */
  long_url: string
  /**
   * Custom Bitlink
   */
  custom_bitlinks: string[]
  /**
   * Link
   */
  link: string
  /**
   * ID
   */
  id: string
}
